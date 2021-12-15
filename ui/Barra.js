const root = document.getElementById('body');
root.innerHTML =
  '<nav class="navbar navbar-dark bg-dark justify-content-end">'+
    '<div class="container-fluid my-2">'+
      '<a class="navbar-brand" href="#">'+
        '<img src="https://www.multiact.eu/wp-content/uploads/2018/11/UNITN_logo.png" alt="" width="40" height="40" class="d-inline-block align-text-top">'+
        'Work4Me'+
        '<button type="button" class="btn btn-dark" onclick="window.location.href='+"'Index.html'"+'">Home</button>'+
        '<button type="button" class="btn btn-dark" onclick="window.location.href='+"'Profile.html?id=61b4e01b3ca11808c0daf528'"+'">Profilo</button>'+
        '<button type="button" class="btn btn-dark" onclick="window.location.href='+"'#'"+'">Chat</button>'+
        '<button type="button" class="btn btn-dark" onclick="window.location.href='+"'InserireAnnuncio.html?id=61b4e01b3ca11808c0daf528'"+'">Nuovo Annuncio</button>'+
      '</a>'+

      '<form class="d-flex">'+

        '<div class="dropdown pe-2">'+
          '<select class="form-select" id="categoria" name="categoria" style="width: 100px;">'+
            '<option value="1">One</option>'+
            '<option value="2">Two</option>'+
            '<option value="3">Three</option>'+
          '</select>'+
        '</div>'+
        '<input class="form-control me-2 " type="search" placeholder="Search" aria-label="Search">'+
        '<button class="btn btn-outline-success " type="submit">Search</button>'+
      '</form>'+
    '</div>'+
  '</nav>';

 


