// hard-coded data
var sampleAlbums = [{
  artistName: 'Ladyhawke',
  name: 'Ladyhawke',
  releaseDate: '2008, November 18',
  genres: [ 'new wave', 'indie rock', 'synth pop' ]
}, {
  artistName: 'The Knife',
  name: 'Silent Shout',
  releaseDate: '2006, February 17',
  genres: [ 'synth pop', 'electronica', 'experimental' ]
}, {
  artistName: 'Juno Reactor',
  name: 'Shango',
  releaseDate: '2000, October 9',
  genres: [ 'electronic', 'goa trance', 'tribal house' ]
}, {
  artistName: 'Philip Wesley',
  name: 'Dark Night of the Soul',
  releaseDate: '2008, September 12',
  genres: [ 'piano' ]
}];


$(document).ready(function() {
  console.log('app.js loaded!');

  $.ajax({
    method: 'GET',
    url: '/api/albums',
    success: onSuccess,
    error: function (err) {
      console.log(err);
    }
  });

  $('#album-form').on('submit', function (e) {
    console.log('new album created', $(this).serialize());

    $.ajax({
      method: 'POST',
      url: '/api/albums',
      data: $('#album-form').serialize(),
      success: postNewAlbumSuccess,
      error: postNewAlbumError
    });

  });

    $('#albums').on('click','.delete-album', function (e) {
    console.log('clicked delete button to', '/api/albums' + $('.delete-album').attr('data-id'));

    $.ajax({
      method: 'DELETE',
      url: '/api/albums/' + $(this).attr('data-id'),
      success: deleteAlbumSuccess,
      error: deleteAlbumError
    });

  });


    // this function takes a single album and renders it to the page
  function renderAlbum(album) {
    console.log('rendering album:', album);

    // var newGenres = album.genres.map(function (genre) {
    //   return genre;
    // });
    // newGenres = newGenres.join(', ');

    album.genres = album.genres.join(', ');

       var listedAlbum  =   
       ` <!-- one album -->
            <div class="row album" id="${album._id}">

              <div class="col-md-10 col-md-offset-1">
                <div class="panel panel-default">
                  <div class="panel-body">

                  <!-- begin album internal row -->
                    <div class='row'>
                      <div class="col-md-3 col-xs-12 thumbnail album-art">
                        <img src="/images/800x800.png" alt="album image">
                      </div>

                      <div class="col-md-9 col-xs-12">
                        <ul class="list-group">
                          <li class="list-group-item">
                            <h4 class='inline-header'>Album Name:</h4>
                            <span class='album-name'>${album.name}</span>
                          </li>

                          <li class="list-group-item">
                            <h4 class='inline-header'>Artist Name:</h4>
                            <span class='artist-name'>${album.artistName}</span>
                          </li>

                          <li class="list-group-item">
                            <h4 class='inline-header'>Released date:</h4>
                            <span class='album-releaseDate'>${album.releaseDate}</span>
                          </li>

                          <li class="list-group-item">
                            <h4 class='inline-header'>genres</h4>
                            <span class='album-genres'>${album.genres}</span>
                          </li>
                        </ul>
                      </div>

                    </div>
                    <!-- end of album internal row -->

                    <div class='panel-footer'>
                    <button class='delete-album btn btn-danger pull-right' data-id=${album._id}>Delete Album</button>
                    </div>

                  </div>

                </div>

              </div>

            </div>
            <!-- end one album -->`
            $('#albums').prepend(listedAlbum);
  }


  function validateForm(){
    var form = document.getElementById("album-form"), inputs = form.getElementsByTagName("input"), input = null, flag = true;
    for(var i = 0, len = inputs.length; i < len; i++) {
        input = inputs[i];
        if(!input.value) {
            flag = false;
            input.focus();
            alert("Please fill all the inputs");
            break;
        }
    }
    return(flag);
  }


  function onSuccess(albums) {
    console.log(albums);
    albums.forEach(function (albumsObject) {
      renderAlbum (albumsObject);
    })
  }


  function postNewAlbumSuccess(newAlbum) {
    renderAlbum(newAlbum);
  }

  function postNewAlbumError(err) {
        console.log('error: ' + err);
  }

  function deleteAlbumSuccess(deletedAlbum) {
    console.log(deletedAlbum);

    var deletedAlbumId = deletedAlbum._id;
    $(`#${deletedAlbumId}`).remove();
  }

  function deleteAlbumError() {
    console.log('delete album error');
  }


});


