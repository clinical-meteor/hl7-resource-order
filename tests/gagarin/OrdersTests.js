describe('clinical:hl7-resources-orders', function () {
  var server = meteor();
  var client = browser(server);

  it('Orders should exist on the client', function () {
    return client.execute(function () {
      expect(Orders).to.exist;
    });
  });

  it('Orders should exist on the server', function () {
    return server.execute(function () {
      expect(Orders).to.exist;
    });
  });

});
