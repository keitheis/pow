(function() {
  var DnsServer, NS_C_IN, NS_RCODE_NXDOMAIN, NS_T_A, dnsserver;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  dnsserver = require("dnsserver");

  NS_T_A = 1;

  NS_C_IN = 1;

  NS_RCODE_NXDOMAIN = 3;

  module.exports = DnsServer = (function() {

    __extends(DnsServer, dnsserver.Server);

    function DnsServer(configuration) {
      this.configuration = configuration;
      this.handleRequest = __bind(this.handleRequest, this);
      DnsServer.__super__.constructor.apply(this, arguments);
      this.on("request", this.handleRequest);
    }

    DnsServer.prototype.listen = function(port, callback) {
      this.bind(port);
      return typeof callback === "function" ? callback() : void 0;
    };

    DnsServer.prototype.handleRequest = function(req, res) {
      var pattern, q, _ref;
      pattern = this.configuration.dnsDomainPattern;
      q = (_ref = req.question) != null ? _ref : {};
      if (q.type === NS_T_A && q["class"] === NS_C_IN && pattern.test(q.name)) {
        res.addRR(q.name, NS_T_A, NS_C_IN, 600, "127.0.0.1");
      } else {
        res.header.rcode = NS_RCODE_NXDOMAIN;
      }
      return res.send();
    };

    return DnsServer;

  })();

}).call(this);
