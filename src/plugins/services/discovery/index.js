const name = 'discovery-service';
const DISCOVERY_SERVICE_MASK = process.env.DISCOVERY_SERVICE_MASK || 'service::';

export default {
    name,
    register: async server => {
        const getAll = () => {
            const services = Object.keys(server)
                .filter(key => key.includes(DISCOVERY_SERVICE_MASK))
                .reduce((obj, key) => {
                    const service = key.replace(DISCOVERY_SERVICE_MASK, '');

                    obj[service] = server[key];
                    return obj;
                }, {});

            return services;
        };

        const get = service => {
            const services = getAll();

            if (!services.hasOwnProperty(service)) {
                throw new Error(`[${service}] service does not exist`);
            }

            return services[service];
        };

        server.decorate('server', `${DISCOVERY_SERVICE_MASK}discovery`, { get, getAll });
    }
};
