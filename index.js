const { Kafka } = require('kafkajs')
var fs = require('fs');
var axios = require('axios');


class simpleConsumer{

     constructor(){
         this.tenant_config     = JSON.parse(process.env.JSON_TENANT_CONFIG ? process.env.JSON_TENANT_CONFIG : "")
         this.kafka_topic_from  = this.tenant_config['streams'][process.env.KAFKA_TOPIC_FROM]['read'] 
         this.client_id         = process.env.MESOS_TASK_ID
     }

     isConfigValid(){
        var v = false;
        if (
            this.tenant_config !== undefined &&
            this.tenant_config['brokers'] !== undefined &&
            this.tenant_config['streams'] !== undefined &&
            this.tenant_config['private_consumer_groups'] !== undefined &&
            this.tenant_config['shared_consumer_groups'] !== undefined &&
            this.kafka_topic_from !== undefined && this.kafka_topic_from !== "" &&
            this.client_id !==undefined
    
        ){
            v = true
        }
        return v;
    }

     async startApp(){

        if(this.isConfigValid()){
            this.kafka_config = {
                clientId: this.client_id,
                brokers: this.tenant_config['brokers'],
                initialRetryTime: 100,
                retries: 10,
                ssl: {
                    rejectUnauthorized: false,
                    ca: fs.readFileSync('/home/node/app/ca.crt'),
                    cert: fs.readFileSync('/home/node/app/client.crt'),
                    key: fs.readFileSync('/home/node/app/client.key')
                },
            }

            this.connector = new Kafka(this.kafka_config)

            //read stream
            this.consumer =  this.connector.consumer({groupId: this.tenant_config['private_consumer_groups'][1]})
            await this.consumer.connect()
            await this.consumer.subscribe({topic: new RegExp(this.kafka_topic_from)})

            await this.consumer.run({

                eachMessage: async ({topic, partition, message}) => {
                   console.log("please print some messages")
                }
            })
        }    
     }
};

var app = new simpleConsumer()
app.startApp()