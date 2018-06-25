#!/usr/bin/env node
import app from '../app';

app.set('port', process.env.PORT || 8000);

const server = app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + server.address().port);
});
