(function() {
  'use strict';
  
  angular.module("iphoneApp", [])
    .controller('iphoneController', iphoneController);
  
  function iphoneController($interval) {
    //Scope Variables
    var vm = this;
    vm.apps = [messages, internet, camera, clock, reddit, uber, photos, settings, videos, google_maps, maps, netflix, app_store, linkedin, facebook, hbo_now, instagram, skype, twitter, weather, stocks, compass, icloud, espn];
    vm.dock = [phone, mail, notes, music];
    vm.wallpaperProp = {'background-image': "url(http://i1.wp.com/ioshacker.com/wp-content/uploads/2013/11/batman-wallpaper-iphone-5s-silver.jpg)"};
    vm.deleteMode = false;
    vm.cell_signal = {level: 1};
    vm.battery_percent = {level: 19};
    vm.batteryProp = {width: vm.battery_percent + "%"};
    vm.current_date = Date.now();
    
    //to run on app init
    function init() {
      $interval(updateDate, 1000);
    }
    init();

    //Public Functions
    vm.addAppToPage = function() {
      addApp(vm.apps, 24);
    }

    vm.removeAppFromPage = function(index) {
      removeApp(vm.apps, infex)
    }
    
    vm.addAppToDock = function() {
      addApp(vm.dock, 4);
    }

    vm.removeAppFromDock = function(index) {
      removeApp(vm.dock, index);
    }
    
    vm.clearNewAppFields = function() {
      vm.newName = "";
      vm.newImg = "";
      vm.newNotis = "";
    }
    
    vm.setBatteryLevel = function() {
      setLevel(vm.battery_percent, vm.newBatteryLevel, 100)
      vm.batteryProp = {width: vm.battery_percent.level + "%"}
    }
    
    vm.setCellLevel = function() {
      setLevel(vm.cell_signal, vm.newCellLevel, 5);
    }
    
    vm.setWallpaper = function() {
      vm.wallpaperProp = {'background-image': 'url(' + vm.newWallpaper + ')'}
    }

    //Private functions
    function updateDate() {
      vm.current_date = Date.now();
    }

    function addApp(arr, max) {
      var newApp = {
        name: vm.newName,
        img: vm.newImg,
        notifications: vm.newNotis,
        order: arr.length
      }
      if (arr.length < max) {
        arr.push(newApp);
        vm.clearNewAppFields();
      } else {
        alert("Only " + max + " allowed in this section.")
      }
    }

    function removeApp(arr, index) {
      arr.splice(index, 1);
      for (var i = index; i < arr.length; i++) {
        arr[i].order = i;
      }
    }

    function setLevel (obj, val, max) {
      var int = parseInt(val);
      console.log(obj);
      if (int < 0
         || int > max
         || val == ""
         || int == undefined
         || !int) {
        obj.level = max;
      } else {
        obj.level = int;
      }
    }
    
    
  }//End of Controller
  
  
}());