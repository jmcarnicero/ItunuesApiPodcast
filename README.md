Naptilus
  index.js
  app.js
  styles/
  data/
    reducer.js
    actions.js
    types.js  
  components/
    Info/   
  scenes/
    App/
      components/
        Loading/  
      Detail/  
        ->PodcastDetail
        components
          TrackList/
      List/  state.Podcasts
        components/
          Filter/
          Card/
      Track/   
        ->PodcastDetail
        TrackInfo/

----- Instalacion de dependencias -----
  npm install

----- Arrancar modo dev -----
  npm start

----- Build -----
  Npm build

----- Deploy -----
https://napptilus.herokuapp.com/#/

----- Views -----

Podcast_List    URL:​ /
Podcast_Detail  URL:​ /podcast/{podcastId}
Podcast_Chapter URL:​ /podcast/{podcastId}/episode/{episodeId}

----- Compnents -----
    App
    Loading
    Header

    Podcast_List/
      Podcast_list
        Filter
        Podcast_card

    Podcast_Detail/
      podcast_detail
        Podcast_info
        Podcast_track_list

    Podcast_Chapter/
      Podcast_chapter
        Podcast_info *
        Podcast_track_detail
