import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import * as actions from '../../../data/actions/';
import Filter from './components/Filter';
import Card from './components/Card';

class List extends Component {
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
    return this.props.podcasts.filter((podcast) => {
      const filterName = podcast['im:name'].label.indexOf(filter);
      const filterArtist = podcast['im:artist'].label.indexOf(filter);

      if (filterName > -1 || filterArtist > -1) {
        return podcast;
      }
      return false;
    });
  }

  handleChangeFilter(e) {
    const podcastFiltered = this.filterPodcast(e.currentTarget.value);
    this.setState({
      podcasts: podcastFiltered,
      itemsFiltered: podcastFiltered.length,
    });
  }

  render() {
    const renderCard = (item, i) => <Card key={i} {...item} />;

    return (
      <div>
        <div className="row">
          <Filter handleChange={this.handleChangeFilter} />
          <span className="label label-primary pull-right itemsFiltered">
            {this.state.itemsFiltered}
          </span>
        </div>
        <div className="row podcast-list">
          <div className="podcast-list grid-container">{this.state.podcasts.map(renderCard)}</div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    podcasts: state.podcasts,
    filter: state.filter,
  };
}

const mapDispatchToProps = dispatch => ({
  fetchPodcasts: () => dispatch(actions.fetchPodcasts()),
});

export default connect(mapStateToProps, mapDispatchToProps)(List);
