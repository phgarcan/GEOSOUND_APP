module.exports = {
    copyLeaflet: {
      src: ['{{ROOT}}/node_modules/leaflet/dist/leaflet.css'],
      dest: '{{WWW}}/assets/leaflet/'
    },
    copyLeafletAssets: {
      src: ['{{ROOT}}/node_modules/leaflet/dist/images/**/*'],
      dest: '{{WWW}}/assets/leaflet/images/'
    },
    copyLeafletCluster : {
      src : ['{{ROOT}}/node_modules/leaflet.markercluster/dist/MarkerCluster.css'],
      dest: '{{WWW}}/assets/leaflet/'
    },
    copyLeafletClusterDefault : {
      src : ['{{ROOT}}/node_modules/leaflet.markercluster/dist/MarkerCluster.Default.css'],
      dest: '{{WWW}}/assets/leaflet/'
    }
  };