# What do you need ?

- Access to the DSH console         -> https://console.poc.kpn-dsh.com
- Access to the docker image repo  	-> https://registry.cp.kpn-dsh.com/
- Docker                            -> https://hub.docker.com/_/hello-world
- Make                              -> install -> https://chocolatey.org/install & choco install make  
- Example config of a service on the DSH
```bash
{
	"name": "consumer-group-1",
	"image": "registry.cp.kpn-dsh.com/ordina-codestar-2/consumer-group-1:1",
	"cpus": 0.1,
	"mem": 256,
	"env": {
		"KAFKA_TOPIC_FROM": "aanpassing-vereist-stream-invoeren"
	},
	"instances": 1,
	"singleInstance": false,
	"needsToken": true,
	"user": "2037:2037"
}
```

# TENANT ordina-codestar-2

# 1 ) Assignments
- a. Change the group number in the makefile. e.g: "tagname=consumer-group-1" <--- add the correct group number. Also change the service config on the DSH with the correct image name e.g: "image": "registry.cp.kpn-dsh.com/ordina-codestar-2/consumer-group-1:1"
- b. Print events from the stream "internal.gecombineerd-ordina-codestar-1", zie https://kafka.js.org/docs/getting-started.
- c. Create a service on the DSH with the name "consumer-group-1" <--- add the correct group number. 
- d. docker login registry.cp.kpn-dsh.com. You can find your credentials in the image repo under the userprofile.

- *It's important to push the changes to the image repository so you can test it on the DSH. Also make sure you restart the service*

# 2 ) Docker login & Make all.
- You need credentials for the command docker login. You can find your credentials in the image repo under the userprofile.
```sh
command : docker login registry.cp.kpn-dsh.com
command : make all
```