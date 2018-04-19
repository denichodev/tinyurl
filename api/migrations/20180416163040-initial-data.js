exports.up = function(r, conn) {
  return Promise.all([
    r
      .tableCreate('tickets')
      .run(conn)
      .catch(err => {
        console.log(err);
        throw err;
      }),
    r
      .tableCreate('urls')
      .run(conn)
      .catch(err => {
        console.log(err);
        throw err;
      }),
    r
      .tableCreate('users')
      .run(conn)
      .catch(err => {
        console.log(err);
        throw err;
      }),
    r
      .tableCreate('urlsMap')
      .run(conn)
      .catch(err => {
        console.log(err);
        throw err;
      })
  ]).then(() =>
    Promise.all([
      r
        .table('urls')
        .indexCreate('originalUrl', r.row('originalUrl'))
        .run(conn)
        .catch(err => {
          console.log(err);
          throw err;
        }),
      r
        .table('urls')
        .indexCreate('createdAt', r.row('createdAt'))
        .run(conn)
        .catch(err => {
          console.log(err);
          throw err;
        }),
      r
        .table('urls')
        .indexCreate('expiredAt', r.row('expiredAt'))
        .run(conn)
        .catch(err => {
          console.log(err);
          throw err;
        }),
      r
        .table('urls')
        .indexCreate('deletedAt', r.row('deletedAt'))
        .run(conn)
        .catch(err => {
          console.log(err);
          throw err;
        }),
      r
        .table('users')
        .indexCreate('name', r.row('name'))
        .run(conn)
        .catch(err => {
          console.log(err);
          throw err;
        }),
      r
        .table('users')
        .indexCreate('email', r.row('email'))
        .run(conn)
        .catch(err => {
          console.log(err);
          throw err;
        }),
      r
        .table('users')
        .indexCreate('createdAt', r.row('createdAt'))
        .run(conn)
        .catch(err => {
          console.log(err);
          throw err;
        }),
      r
        .table('users')
        .indexCreate('lastLogin', r.row('lastLogin'))
        .run(conn)
        .catch(err => {
          console.log(err);
          throw err;
        })
    ])
  );
};

exports.down = function(r, conn) {
  return Promise.all([
    r
      .tableDrop('tickets')
      .run(conn)
      .catch(err => {
        console.log(err);
        throw err;
      }),
    r
      .tableDrop('urls')
      .run(conn)
      .catch(err => {
        console.log(err);
        throw err;
      }),
    r
      .tableDrop('users')
      .run(conn)
      .catch(err => {
        console.log(err);
        throw err;
      }),
    r
      .tableDrop('urlsMap')
      .run(conn)
      .catch(err => {
        console.log(err);
        throw err;
      })
  ]);
};
