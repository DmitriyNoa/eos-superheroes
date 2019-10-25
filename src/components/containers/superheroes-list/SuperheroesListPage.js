import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux"
import * as actions from "../../../actions/superheroesActions";
import PropTypes from "prop-types";
import {SuperheroesList} from "../../SuperheroesList";

class SuperheroesListPage extends React.Component {

  componentDidMount() {
    this.props.actions.loadSuperheroes();
  }

  render() {
    return (
      <div>
        <h1>EOS superheroes reviews</h1>
        <SuperheroesList superheroes={this.props.superheroes} />
      </div>
    )
  }
}

SuperheroesListPage.propTypes = {
  actions: PropTypes.object.isRequired,
  superheroes: PropTypes.array.isRequired
};


const mapStateToProps = (state) => ({
  superheroes: state.superheroes
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SuperheroesListPage);
