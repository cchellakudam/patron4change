#!/bin/bash

### HELP
function print_usage(){
	echo "Docker compose control
  docker-ctrl.sh [OPTIONS] ACTION PARAM
  ACTIONS:
    create       Creates containers (docker-compose up)
    stop         Stops containers (docker-compose stop)
    rm           Remove docker containers&network (docker-compose down)
  PARAMS:
    all          action applies to all available containers
    db           action only applied to database
    elastic      action only applied to elasticsearch
    webapp       action only applied to webapp
  OPTIONS:
    -p, --purge  removes data from docker volumes for containers
    -h, --help   show usage"

}
### get all options
while [[ $# -gt 2 ]]
do
key="$1"

case $key in
    -p|--purge)
    PURGE=true
    echo "purge volumes true"
    shift # past argument
    ;;
    -h|--help)
    print_usage
    exit 0
    ;;
    -*)
      echo "unkown option"      # unknown option
      show_help
      return -1
    ;;
esac
# shift # past argument or value
done

ACTION=$1
PARAM=$2

### setting up useful variables
projecttag=p4c
allfilesopt="-f docker-compose.yml -f docker-compose.postgres.yml -f docker-compose.elastic.yml -f docker-compose.webapp.yml"

function remove_postgres_volume {
	docker volume rm ${projecttag}_postgres-data
}
function remove_elastic_volume {
	docker volume rm ${projecttag}_elastic-data
}
function purge_all_volumes() {
	remove_postgres_volume
	remove_elastic_volume
}

function create_all_containers() {
	echo "creating containers postgres, elastic"
	docker-compose ${allfilesopt} -p ${projecttag} up -d

}

function shutdown_all_containers() {
	echo "shutting down containers..."
	docker-compose ${allfilesopt} -p ${projecttag} stop

}

function remove_all_containers() {
	echo "removing containers..."
	docker-compose ${allfilesopt} -p ${projecttag} down

}

function create_postgres_cotainer() {
	echo "creating postgres container"
	docker-compose -f docker-compose.yml -f docker-compose.postgres.yml -p ${projecttag} up -d
}

function shutdown_postgres_container() {
	echo "shutting down containers..."
	docker-compose -f docker-compose.yml -f docker-compose.postgres.yml -p ${projecttag} stop

}

function remove_postgres_container() {
	echo "removing containers..."
	docker-compose -f docker-compose.yml -f docker-compose.postgres.yml -p ${projecttag} down

}
function create_elastic_container() {
	echo "creating elastic container"
	docker-compose -f docker-compose.yml -f docker-compose.elastic.yml -p ${projecttag} up -d

}

function shutdown_elastic_containers() {
	echo "shutting down containers..."
	docker-compose -f docker-compose.yml -f docker-compose.elastic.yml -p ${projecttag} stop

}

function remove_elastic_containers() {
	echo "removing containers..."
	docker-compose -f docker-compose.yml -f docker-compose.elastic.yml -p ${projecttag} down

}

function create_webapp_container() {
	echo "creating webapp container"
	docker-compose -f docker-compose.yml -f docker-compose.p4c.yml -p ${projecttag} up -d

}

function shutdown_webapp_containers() {
	echo "shutting down containers..."
	docker-compose -f docker-compose.yml -f docker-compose.p4c.yml -p ${projecttag} stop

}

function remove_webapp_containers() {
	echo "removing containers..."
	docker-compose -f docker-compose.yml -f docker-compose.p4c.yml -p ${projecttag} down

}


## REMOVE VOLUMES IF FLAG IS RAISED
if [ "$PURGE" ]; then
	if [ "$PARAM" = "all" ]; then
		remove_elastic_volume
		remove_postgres_volume
	elif [ "$PARAM" = "db" ]; then
		remove_postgres_volume
	elif [ "$PARAM" = "elastic" ]; then
		remove_elastic_volume
	fi
fi

if [ "$ACTION" = "create" ]; then
  if [ "$PARAM" = "all" ]; then
		create_all_containers
	fi

	if [ "$PARAM" = "db" ]; then
		create_postgres_cotainer
	fi
	if [ "$PARAM" = "elastic" ]; then
		create_elastic_container
	fi
	if [ "$PARAM" = "webapp" ]; then
		create_webapp_container
	fi
	exit 0
elif [ "$ACTION" = "stop" ]; then
	if [ "$PARAM" = "all" ]; then
		shutdown_all_containers
	fi
	if [ "$PARAM" = "db" ]; then
		shutdown_postgres_container
	fi
	if [ "$PARAM" = "elastic" ]; then
		shutdown_elastic_containers
	fi
	if [ "$PARAM" = "webapp" ]; then
		shutdown_webapp_containers
	fi
	exit 0
elif [ "$ACTION" = "rm" ]; then
	if [ "$PARAM" = "all" ]; then
		shutdown_all_containers
		remove_all_containers
	fi
	if [ "$PARAM" = "db" ]; then
		shutdown_postgres_container
		remove_postgres_container
	fi
	if [ "$PARAM" = "elastic" ]; then
		shutdown_elastic_containers
		remove_elastic_containers
	fi
	if [ "$PARAM" = "webapp" ]; then
		shutdown_webapp_containers
		remove_webapp_containers
	fi
	exit 0
fi

print_usage
