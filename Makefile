PLATFORM=poc
TENANT=ordina-codestar-2
DOCKER_REPO_URL=registry.cp.kpn-dsh.com/$(TENANT)
VERSION:=1
tagname=consumer-group-100
tenantuserid=2037
image=$(DOCKER_REPO_URL)/$(tagname):$(VERSION)
help:
	@echo "build - build the  image"
	@echo "run   - run the image in local docker"
	@echo "push  - push the  image to Harbor"
	@echo "show  - show the current make variables"
	@echo "stop  - stop the current container"
	@echo "rm    - remove the current container"
build:
	docker build --build-arg id=$(tenantuserid) -t $(tagname) .
	docker tag  $(tagname) $(image)
run:
	docker rm  -f $(tagname)
	docker run --env-file .env --name $(tagname) -d -u $(tenantuserid):$(tenantuserid) -it $(image)
stop:
	docker stop $(tagname)
rm:
	docker rm  -f $(tagname)
logs:
	docker logs --follow $(tagname)
all:
	docker build --build-arg id=$(tenantuserid) -t $(tagname) .
	docker tag  $(tagname) $(image)
	docker push $(image)
rm:
	docker rm  -f $(tagname)
push:
	docker push $(image)
show:
	@echo "make file configuration"
	@echo "URL:" $(DOCKER_REPO_URL)
	@echo "TENANT:" $(TENANT)
	@echo "PLATFORM:" $(PLATFORM)
	@echo "version:" $(VERSION)
	@publish=$(DOCKER_REPO_URL)/$(image)
	@echo "tagname:" $(tagname)
	@echo "tenantuserid" $(tenantuserid)
