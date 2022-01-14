import React from 'react';
import PropTypes from 'prop-types';
import Selection from 'react-ds';

export default class Example extends React.PureComponent {

  constructor() {
    super();
    this.state = {
      ref: null,
      elRefs: [],
      selectedElements: [], // track the elements that are selected
    };
  }

  handleSelection = (indexes) => { // eslint-disable-line no-undef
    this.setState({
      selectedElements: indexes,
    });
  };

  getStyle = (index) => { // eslint-disable-line no-undef
    if (this.state.selectedElements.indexOf(index) > -1) {
      // Selected state
      return {
        background: '#2185d0',
        borderColor: '#2185d0',
        color: 'white',
      };
    }
    return {};
  };

  addElementRef = (ref) => { // eslint-disable-line no-undef
    const elRefs = this.state.elRefs;
    elRefs.push(ref);
    this.setState({
      elRefs,
    });
  };

  renderSelection() {
    if (!this.state.ref || !this.state.elRefs) {
      return null;
    }
    return (
      <Selection
        target={ this.state.ref}
        elements={ this.state.elRefs }
        onSelectionChange={ this.handleSelection }
        style={ this.props.style }
        ignoreTargets={ this.props.ignoreTargets }
      />
    );
  }

  render() {
    const selectableElements = [
      'one',
      'another',
      'hey there',
      'item',
      'two',
      'three',
      'something longer?',
      'last'
    ];
    return (
      <div ref={ (ref) => { this.setState({ ref }); } } className='item-container'>
        {this.props.children}
        { this.renderSelection() }
      </div>
    );
  }
}

Example.PropTypes = {
  style: PropTypes.object,
  ignoreTargets: PropTypes.array,
};