export PROJECT = sensors
export PROJECT_IP = 127.0.0.1
DOCKER = docker
DOCKER_COMPOSE = docker-compose
DOCKER_SYNC = docker-sync
EXEC = $(DOCKER_COMPOSE) -f docker-compose.yml -p $(PROJECT)_devel exec -T

build: ##@setup build docker images
	$(DOCKER_COMPOSE) build
.PHONY: build

start: ##@development start servers
#	$(DOCKER_SYNC) start || true
	$(DOCKER_COMPOSE) up -d
.PHONY: start

stop: ##@development stop servers
	$(DOCKER) stop $(shell docker ps -aq)
	$(DOCKER_SYNC) stop || exit 0
.PHONY: stop

clean:  ##@setup clean environment
	$(DOCKER_COMPOSE) down --remove-orphans
	$(DOCKER_SYNC) clean
	$(DOCKER_SYNC) stop
.PHONY: clean

setup: build start ##@setup set up environment
.PHONY: setup
