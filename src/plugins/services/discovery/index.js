import Config from 'Config/';

const name = 'discovery-service';
const serviceMask = Config.get('services.mask');

export default {
  name,
  register: async server => {
    const getAll = () => {
      const services = Object.keys(server)
        .filter(key => key.includes(serviceMask))
        .reduce((obj, key) => {
          const service = key.replace(serviceMask, '');

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

    server.decorate('server', 'discoveryService', { get, getAll });
  },
};
