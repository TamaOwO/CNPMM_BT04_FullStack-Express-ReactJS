const { Client } = require("@elastic/elasticsearch");

const esClient = new Client({
  node: "http://localhost:9200", // Địa chỉ Elasticsearch
});

module.exports = esClient;