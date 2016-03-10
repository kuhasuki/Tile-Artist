var ApiActions = require("../actions/api_actions.js");

Api = {
  login: function(name, password){
    $.post('/sessions', {"user": {"name": name, "password": password}}, function(data){
      ApiActions.loginAttempt(data);
    });
  },

  register: function(name, password){
    $.post('/users', {"user": {"name": name, "password": password}}, function(data){
      ApiActions.registerAttempt(data);
    });
  },

  verifySession: function(){
  	$.get('/sessions', {}, function(data){
  		ApiActions.checkSession(data);
  	});
  },

  saveNewPicture: function(title, userId, base, size, grid){
    $.post('/pictures', {"picture": {"title": title, "user_id": userId, "base": base, "size": size, "grid": JSON.stringify(grid)}}, function(data){
      ApiActions.saveAttempt(data);
    });
  },

  fetchPicById: function(id){
    $.get('/pic/' + id, {}, function(data){
      ApiActions.fetchPicById(data);
    });
  },

  fetchPicsById: function(id){
    $.get('/pics/' + id, {}, function(data){
      ApiActions.fetchPicsById(data);
    });
  },
};

module.exports = Api;
