import React, { Component, useRef } from "react";

import "./styles.scss";

import ReactScrollDetect, { DetectSection } from "react-scroll-detect";

import ContentLoader from "react-content-loader";

import GroceryMenu from "./GroceryMenu";
import GroceriesList from "./GroceriesList";

import { Fade } from "react-animation-components";

import {
  handleSectionChange,
  crossOutGroceryInstanceInServer,
} from "../../redux/ActionCreators";

import { connect } from "react-redux";

import VisibilitySensor from "react-visibility-sensor";

const mapStateToProps = (state) => {
  return { groceryCategories: state.groceryCategories };
};

const mapDispatchToProps = {
  handleSectionChange: (i) => handleSectionChange(i),
  crossOutGroceryInstanceInServer: (id) => crossOutGroceryInstanceInServer(id),
};

class Groceries extends Component {
  constructor(props) {
    super(props);
    this.state = {
      placeholderArray: [
        0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
        20, 21, 22, 23,
      ],
    };
  }

  render() {
    const handleSectionVisible = (v, cat) => {
      if (v) {
        console.log(v, cat, "SCROLLLDETECTTT");
        this.props.handleSectionChange(cat.id);
      }
    };
    return (
      <Fade in>
        <div className="grocery-container px-4 mt-5">
          <div className="row">
            {this.props.groceryCategories.isLoading ? (
              <>
                <ContentLoader
                  height={500}
                  width={400}
                  speed={2}
                  backgroundColor={"#f0f2f5"}
                  foregroundColor={"white"}
                  className="d-none d-lg-block sticky-menu"
                >
                  {/* menu */}
                  <rect x="3" y="131" rx="5" ry="5" width="320" height="45" />
                  <rect x="3" y="180" rx="5" ry="5" width="320" height="45" />
                  <rect x="3" y="230" rx="5" ry="5" width="320" height="45" />
                  <rect x="3" y="280" rx="5" ry="5" width="320" height="45" />
                  <rect x="3" y="330" rx="5" ry="5" width="320" height="45" />
                  <rect x="3" y="380" rx="5" ry="5" width="320" height="45" />

                  {/* searchbar */}
                  <rect x="261" y="58" rx="5" ry="5" width="60" height="45" />
                  <rect x="46" y="58" rx="5" ry="5" width="210" height="45" />
                  <rect x="3" y="58" rx="5" ry="5" width="38" height="45" />
                </ContentLoader>
              </>
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
                  <>
                    <ContentLoader
                      height={60}
                      width={"100%"}
                      speed={2}
                      backgroundColor={"#f0f2f5"}
                      foregroundColor={"white"}
                    >
                      <rect
                        x="3"
                        y="10"
                        rx="5"
                        ry="5"
                        width={"100%"}
                        height="45"
                      />
                    </ContentLoader>

                    <div>
                      {this.state.placeholderArray.map((placeholder) => {
                        return (
                          <div className="col-xl-2 col-lg-3 col-md-3 col-4 col-4 d-inline-block pl-1">
                            <ContentLoader
                              height={145}
                              width={"112%"}
                              speed={2}
                              backgroundColor={"#f0f2f5"}
                              foregroundColor={"white"}
                            >
                              <rect
                                x="0"
                                y="0"
                                rx="5"
                                ry="5"
                                width={"100%"}
                                height="25"
                              />
                              <rect
                                x="0"
                                y="30"
                                rx="5"
                                ry="5"
                                width={"100%"}
                                height="85"
                              />
                            </ContentLoader>
                          </div>
                        );
                      })}
                    </div>
                  </>
                ) : (
                  <Fade in>
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
                              className="rainbow"
                              hasItems={
                                this.props.groceryInstances.filter(
                                  (g) => g.grocery.category === category.id
                                ).length
                              }
                              category={category}
                              groceryInstances={this.props.groceryInstances}
                              refObj={this.props.refObj}
                              crossOutGroceryInstanceInServer={
                                this.props.crossOutGroceryInstanceInServer
                              }
                            />
                          </VisibilitySensor>
                        );
                      }
                    )}
                  </Fade>
                )}
              </div>
            </div>
          </div>
        </div>
      </Fade>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Groceries);
