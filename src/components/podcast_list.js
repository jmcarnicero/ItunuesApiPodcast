import React from 'react';
import PropTypes from 'prop-types';
import Podcast from './podcast';

const PodcastList = (props) => {
  const renderPodcast = (item, i) => <Podcast key={i} {...item} />;
  return <div className="podcast-list grid-container">{props.podcasts.map(renderPodcast)}</div>;
};

PodcastList.propTypes = {
  podcasts: PropTypes.arrayOf(PropTypes.shape).isRequired,
};

export default PodcastList;
