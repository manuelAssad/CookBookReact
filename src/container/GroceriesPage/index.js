import React, { Component, useRef } from "react";

import "./styles.scss";

import ReactScrollDetect, { DetectSection } from "react-scroll-detect";

import GroceryMenu from "./GroceryMenu";
import GroceriesList from "./GroceriesList";

import { handleSectionChange } from "../../redux/ActionCreators";

import { connect } from "react-redux";

import VisibilitySensor from "react-visibility-sensor";

const mapStateToProps = (state) => {
  return { groceryCategories: state.groceryCategories };
};

const mapDispatchToProps = {
  handleSectionChange: (i) => handleSectionChange(i),
};

class Groceries extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const handleSectionVisible = (v, cat) => {
      if (v) {
        console.log(v, cat, "SCROLLLDETECTTT");
        this.props.handleSectionChange(cat.id);
      }
    };
    return (
      <>
        <div className="grocery-container px-4 mt-5">
          <div className="row">
            {this.props.groceryCategories.groceryCategoriesLoading && false ? (
              <div>Loading Menu...</div>
            ) : (
              <GroceryMenu
                groceryCategories={
                  this.props.groceryCategories.groceryCategories
                }
                groceriesList={this.props.groceries}
                groceriesLoading={this.props.groceriesLoading}
                groceriesErrMess={this.props.groceriesErrMess}
                groceryInstances={this.props.groceryInstances}
              />
            )}
            <div className="col-md-12 col-lg-7 col-xl-8 offset-xl-3 offset-lg-4 pt-lg-5 pl-lg-5 groceries-list-container">
              <div className="tab-content">
                {this.props.groceryInstancesLoading ? (
                  <div>Loading items...</div>
                ) : (
                  <>
                    {!this.props.groceryInstances.length ? (
                      <div>Add your first grocery from the searchbar</div>
                    ) : null}
                    {this.props.groceryCategories.groceryCategories.map(
                      (category) => {
                        return (
                          <VisibilitySensor
                            onChange={(v) => handleSectionVisible(v, category)}
                          >
                            <GroceriesList
                              hasItems={
                                this.props.groceryInstances.filter(
                                  (g) => g.grocery.category === category.id
                                ).length
                              }
                              category={category}
                              groceryInstances={this.props.groceryInstances}
                              refObj={this.props.refObj}
                            />
                          </VisibilitySensor>
                        );
                      }
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Groceries);
