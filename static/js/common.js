const getCookie = function(name) {
  const value = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
  return value? value[2] : null;
};

const NODE_API_HOST="http://apis.movie.gureuso.me";
