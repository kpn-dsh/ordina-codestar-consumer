# Wat heb je nodig ?

- Toegang tot dsh console           -> https://console.poc.kpn-dsh.com
- Toegang tot de docker image repo  -> https://registry.cp.kpn-dsh.com/
- Docker                            -> https://hub.docker.com/_/hello-world
- Make                              -> https://chocolatey.org/install en vervolgens voer uit 
choco install make  
- Voorbeeld config een nieuwe service op de DSH
```bash
{
	"name": "consumer-group-1",
	"image": "registry.cp.kpn-dsh.com/ordina-codestar-2/transformer:1",
	"cpus": 0.1,
	"mem": 256,
	"env": {
		"KAFKA_TOPIC_FROM": "internal.gecombineerd-ordina-codestar-1"
	},
	"instances": 1,
	"singleInstance": false,
	"needsToken": true,
	"user": "2037:2037"
}
```

# TENANT ordina-codestar-2

# 1 ) Opdracht uitvoeren
- a. Pas de groepsnummer aan in de makefile
- b. Print de events uit de stream "internal.gecombineerd-ordina-codestar-1" , zie https://kafka.js.org/docs/getting-started
- c. Maak een service aan de DSH met de naam "consumer-group-1" <--- voeg de juiste groepsnummer toe

- *bij elke aanpassing wordt geacht om de wijzigingen te pushen en te testen op de DSH (make all) & services restarten op de DSH*

# 2 ) Nieuwe image bakken en pushen.
```sh
command : docker login registry.cp.kpn-dsh.com
command : make all
```