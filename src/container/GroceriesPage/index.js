import React, { Component, useRef } from "react";

import "./styles.scss";

import ReactScrollDetect, { DetectSection } from "react-scroll-detect";

import GroceryMenu from "./GroceryMenu";
import GroceriesList from "./GroceriesList";

class Groceries extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeCat: 0,
    };
  }

  refObj = {};

  render() {
    const handleClickCategory = (id) => {
      if (!this.refObj.c0)
        this.props.groceryCategories.map((cat) => {
          this.refObj[`c${cat.id}`] = React.createRef();
        });

      setTimeout(
        () => {
          this.refObj[`c${id}`].current.scrollIntoView({
            block: "center",
          });
        },
        !this.refObj.c0 ? 50 : 0
      );

      this.setState({ activeCat: id });
    };

    const handleSectionChange = (v) => {
      const categoryId = this.props.groceryCategories[v].id;
      this.setState({ activeCat: categoryId });
    };
    return (
      <>
        {console.log(this.props.groceryInstances, "GROCERYINSTANCES")}
        <ReactScrollDetect
          triggerPoint="center"
          onChange={handleSectionChange}
          triggerPoint="center"
        >
          <div className="grocery-container px-4 mt-5">
            <div className="row">
              {this.props.groceryCategoriesLoading ? (
                <div>Loading Menu...</div>
              ) : (
                <GroceryMenu
                  handleClickCategory={handleClickCategory}
                  groceryCategories={this.props.groceryCategories}
                  activeCat={this.state.activeCat}
                />
              )}
              <div className="col-md-12 col-lg-7 col-xl-8 offset-xl-3 offset-lg-4 pt-lg-5 pl-lg-5">
                <div className="tab-content">
                  {this.props.groceryInstancesLoading ? (
                    <div>Loading items...</div>
                  ) : (
                    <>
                      {this.props.groceryCategories.map((category) => {
                        return (
                          <DetectSection>
                            <GroceriesList
                              category={category}
                              groceryInstances={this.props.groceryInstances}
                              refObj={this.refObj}
                            />
                          </DetectSection>
                        );
                      })}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </ReactScrollDetect>
      </>
    );
  }
}

export default Groceries;
