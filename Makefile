FRONTEND_DIR = ./srcs/frontend/vet-appointment
BACKEND_DIR = ./srcs/backend

# Colors
GREEN = \033[0;32m
RED = \033[0;31m
YELLOW = \033[1;33m
BLUE = \033[0;34m
NC = \033[0m

all: build deploy

build: build-frontend build-backend
	@echo "$(GREEN)Build Complete.$(NC)"
	@chmod -x ./scripts/build.sh
	@bash ./scripts/build.sh

build-frontend:
	@echo "$(BLUE)Installing Frontend Dependencies...$(NC)"
	@npm install --prefix $(FRONTEND_DIR)
	@echo "$(BLUE)Building Frontend...$(NC)"
	@npm run build --prefix $(FRONTEND_DIR)

build-backend:
	@echo "$(BLUE)Building Backend Services...$(NC)"
	@make -C $(BACKEND_DIR) all

deploy: 
	@chmod -x ./scripts/deploy.sh
	@bash ./scripts/deploy.sh

clean:
	@echo "$(YELLOW)Cleaning up...$(NC)"
	@make -C $(BACKEND_DIR) clean
	@rm -rf $(FRONTEND_DIR)/node_modules
	@rm -rf $(FRONTEND_DIR)/dist

fclean: clean
	@echo "$(RED)Performing full cleanup...$(NC)"
	@make -C $(BACKEND_DIR) fclean

k8s-clean:
	@echo "$(RED)Cleaning Kubernetes resources...$(NC)"
	@microk8s.kubectl delete deployments --all -A --ignore-not-found
	@microk8s.kubectl delete services --all -A --ignore-not-found
	@microk8s.kubectl delete pods --all -A --ignore-not-found
	@microk8s.kubectl delete configmaps --all -A --ignore-not-found
	@echo "$(GREEN)Kubernetes resources cleaned.$(NC)"

re: fclean all

.PHONY: all build build-frontend build-backend deploy stop clean fclean k8s-clean re
