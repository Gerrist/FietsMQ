import * as yargs from 'yargs';
import * as zmq from 'zeromq';
import {Push, Socket} from 'zeromq';
import * as rp from 'request-promise';
import {StaticFacility} from "./types/StaticFacility";
import {DynamicResponse} from "./types/DynamicResponse";

let facilities: Array<StaticFacility> = [];

const apiUrl = 'http://ab-hbf-staging-wa.azurewebsites.net';

const update = async (sock: Push, apiKey: any) => {
    facilities.forEach(facility => {
        rp({
            uri: apiUrl + '/v1/spdp/dynamic/' + facility.identifier,
            json: true,
            headers: {'X-PRORAIL-API-KEY': apiKey}
        })
            .then((response: Array<DynamicResponse>) => {
                sock.send(JSON.stringify(response));
            })
            .catch(error => {
                console.error("Error: ");
                console.error(error.message);
            });
    });
};

const run = async (apiKey: string, url: string, interval: any) => {
    const sock = new zmq.Push;
    await sock.bind(url).catch(err => {
        console.error("Socket error:", err);
        process.exit();
    });
    console.log(`Bind to ${url} successful!`);


    rp({uri: apiUrl + '/v1/spdp/static', json: true, headers: {'X-PRORAIL-API-KEY': apiKey}})
        .then((response: Array<StaticFacility>) => {
            facilities = response;

            console.log(`Received ${facilities.length} facilities`);
            console.log(facilities);

            update(sock, apiKey);
            setInterval(() => {
                update(sock, apiKey);
            }, interval * 60 * 1000);
        })
        .catch(error => {
            console.error("Error: ");
            console.error(error.message);
            process.exit();
        });
};

let args = yargs.parse(process.argv);


if ('k' in args && 'z' in args && 't' in args) {
    console.log(args['k'], args['z'], args['t']);
    run(args['k'], args['z'], args['t']);
} else {
    throw "Please provide the following arguments: -k for ProRail api key, -t for update interval and -z for ZeroMQ URL";
}



