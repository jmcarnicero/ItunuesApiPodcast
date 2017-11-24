import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as actions from '../../actions';
import Filter from './filter';
import PodcastCard from './podcast_card';

class PodcastList extends Component {
  static propTypes = {
    podcasts: PropTypes.arrayOf(PropTypes.shape).isRequired,
    fetchPodcasts: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = { podcasts: this.props.podcasts, itemsFiltered: 100 };
    this.handleChangeFilter = this.handleChangeFilter.bind(this);
    this.filterPodcast = this.filterPodcast.bind(this);
  }
  componentWillMount() {
    this.props.fetchPodcasts();
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

  handleChangeFilter(e) {
    const podcastFiltered = this.filterPodcast(e.currentTarget.value);
    this.setState({
      podcasts: podcastFiltered,
      itemsFiltered: podcastFiltered.length,
    });
  }

  render() {
    const renderPodcast = (item, i) => (
      <li key={i}>
        <PodcastCard {...item} />
      </li>
    );

    return (
      <div>
        <h1>PodcastList</h1>
        {this.state.itemsFiltered}
        <Filter handleChange={this.handleChangeFilter} />
        <div className="podcast-list grid-container">
          <ul>{this.state.podcasts.map(renderPodcast)}</ul>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { podcasts: state.podcasts, filter: state.filter };
}

const mapDispatchToProps = dispatch => ({
  fetchPodcasts: () => dispatch(actions.fetchPodcasts()),
});

export default connect(mapStateToProps, mapDispatchToProps)(PodcastList);
