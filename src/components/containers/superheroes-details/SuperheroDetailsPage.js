import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux"
import * as actions from "../../../actions/superheroesActions";
import PropTypes from "prop-types";

class SuperheroDetailsPage extends React.Component {

  componentDidMount() {
    console.log(this.props);
    this.props.actions.loadSuperhero(this.props.match.params.id);
  }

  render() {
    return (
      <div>Hero details here</div>
    )
  }
}

SuperheroDetailsPage.propTypes = {
  actions: PropTypes.object.isRequired,
  superhero: PropTypes.object.isRequired
};


const mapStateToProps = (state) => ({
  superhero: state.superheroes.superhero
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SuperheroDetailsPage);
