import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import PodcastList from './podcast_list';
import Filter from './filter';

class podcastsFiltered extends Component {
  static propTypes = {
    podcasts: PropTypes.arrayOf(PropTypes.shape).isRequired,
  };

  constructor(props) {
    super(props);
    this.state = { podcasts: this.props.podcasts, itemsFiltered: 100 };
    this.handleChange = this.handleChange.bind(this);
    this.filterPodcast = this.filterPodcast.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.podcasts !== this.state.podcasts) {
      this.setState({ podcasts: newProps.podcasts });
    }
  }

  filterPodcast(filter) {
    const filtered = this.props.podcasts.filter((podcast) => {
      const filterName = podcast['im:name'].label.indexOf(filter);
      const filterArtist = podcast['im:artist'].label.indexOf(filter);

      if (filterName > -1 || filterArtist > -1) {
        return podcast;
      }

      return false;
    });

    return filtered;
  }

  handleChange(e) {
    const podcastFiltered = this.filterPodcast(e.currentTarget.value);
    this.setState({
      podcasts: podcastFiltered,
      itemsFiltered: podcastFiltered.length,
    });
  }

  render() {
    return (
      <div>
        {this.state.itemsFiltered}
        <Filter handleChange={this.handleChange} />
        <PodcastList podcasts={this.state.podcasts} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { podcasts: state.podcasts, filter: state.filter };
}

export default connect(mapStateToProps)(podcastsFiltered);
