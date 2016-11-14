#!/bin/bash

projecttag=p4c

while [[ $# -gt 2 ]]
do
key="$1"

case $key in
    -p|--purge)
    PURGE=true
    echo "purge volumes true"
    shift # past argument
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

function remove_postgres_volume {
	docker volume rm postgres-data
}
function remove_elastic_volume {
	docker volume rm elastic-data

}
function purge_all_volumes() {
	remove_postgres_volume
	remove_elastic_volume
}

function create_all_containers() {
	echo "creating containers postgres, elastic"
	docker-compose -f docker-compose.yml -f docker-compose.postgres.yml -f docker-compose.elastic.yml -p ${projecttag} up -d

}

function shutdown_all_containers() {
	echo "shutting down containers..."
	docker-compose -f docker-compose.yml -f docker-compose.postgres.yml -f docker-compose.elastic.yml -p ${projecttag} stop

}

function remove_all_containers() {
	echo "removing containers..."
	docker-compose -f docker-compose.yml -f docker-compose.postgres.yml -f docker-compose.elastic.yml -p ${projecttag} down

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



if [ "$ACTION" = "create" ]; then
	if [ "$PURGE" ]; then
		remove_postgres_volume
		remove_elastic_volume
	fi

  if [ "$PARAM" = "all" ]; then
		create_all_containers
	fi

	if [ "$PARAM" = "db" ]; then
		create_postgres_cotainer
	fi
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
fi
