COMPOSE_CMD		= docker compose -f ./docker-compose.yml

GREEN = \033[0;32m
RED = \033[0;31m
YELLOW = \033[1;33m
BLUE = \033[0;34m
NC = \033[0m


all: up

up:
	@$(COMPOSE_CMD) up -d --build
down:
	@echo "$(YELLOW)Stopping all services...$(NC)"
	@$(COMPOSE_CMD) down
stop:
	@echo "$(YELLOW)Stopping and removing containers...$(NC)"
	@$(COMPOSE_CMD) down --remove-orphans
clean: stop
	@echo "$(RED)Cleaning up...$(NC)"
	@docker system prune -f
fclean: clean
	@echo "$(RED)Performing full cleanup...$(NC)"
	@$(COMPOSE_CMD) down --remove-orphans --volumes --rmi --rm all 2>/dev/null || true
	@docker system prune -a --volumes -f
	@docker volume prune -a -f
	@docker network prune -f
re: fclean all
