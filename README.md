Naptilus

----- Deploy ----- 
https://napptilus.herokuapp.com/#/

----- Views -----

Podcast_List    URL:​ /
Podcast_Detail  URL:​ /podcast/{podcastId}
Podcast_Chapter URL:​ /podcast/{podcastId}/episode/{episodeId}

----- Compnents ----- App Loading Header

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
