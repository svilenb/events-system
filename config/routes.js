// Draw routes.  Locomotive's router provides expressive syntax for drawing
// routes, including support for resourceful routes, namespaces, and nesting.
// MVC routes can be mapped to controllers using convenient
// `controller#action` shorthand.  Standard middleware in the form of
// `function(req, res, next)` is also fully supported.  Consult the Locomotive
// Guide on [routing](http://locomotivejs.org/guide/routing.html) for additional
// information.
module.exports = function routes() {
    this.root('pages#home');
    this.get('/register', 'users#getRegister');
    this.post('/register', 'users#postRegister');
    this.get('/error', 'pages#error');
    this.get('/login', 'users#getLogin');
    this.post('/login', 'users#postLogin');
    this.get('/logout', 'users#logout');
    this.get('/profile', 'users#getProfile');
    this.put('/profile', 'users#changeProfile');
    this.get('/user/:userId/activeEvents', 'users#activeEvents');
    this.resources('events', {
        except: ['index']
    });
    this.resources('initiatives', {
        except: ['new']
    });
    this.resources('seasons', {
        except: ['new']
    });
    this.resources('categories', {
        except: ['new']
    });


    // app.get('*', function(req, res) {
    //   res.render('index', {
    //     currentUser: req.user
    //   });
    // });
};
