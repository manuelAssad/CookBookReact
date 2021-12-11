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
      newGroceryName: "",
    };
  }

  render() {
    const handleClickCategory = (id, id2) => {
      const scrollData = this.props.refObj[`c${id}`].current;
      window.scrollTo(0, scrollData.offsetTop);
      this.setState({ activeCat: id });
    };

    const handleSectionChange = (v) => {
      const categoryId = this.props.groceryCategories[v].id;
      this.setState({ activeCat: categoryId });
    };

    const handleChangeNewGrocery = (v) => {
      this.setState({ newGroceryName: v });
    };

    const handleChooseGrocery = (grocery) => {
      this.props.postGrocery(grocery, this.props.refObj);
    };

    const handleSubmitNewGrocery = (matchedValue) => {
      this.props.postGrocery(matchedValue, this.props.refObj);
    };
    return (
      <>
        <ReactScrollDetect
          triggerPoint="center"
          onChange={handleSectionChange}
          triggerPoint="center"
        >
          {console.log("GROCERIESSSS", this.props.groceries)}
          <div className="grocery-container px-4 mt-5">
            <div className="row">
              {this.props.groceryCategoriesLoading && false ? (
                <div>Loading Menu...</div>
              ) : (
                <GroceryMenu
                  handleClickCategory={handleClickCategory}
                  groceryCategories={this.props.groceryCategories}
                  activeCat={this.state.activeCat}
                  newGroceryName={this.state.newGroceryName}
                  handleChangeNewGrocery={handleChangeNewGrocery}
                  handleSubmitNewGrocery={handleSubmitNewGrocery}
                  groceriesList={this.props.groceries}
                  groceriesLoading={this.props.groceriesLoading}
                  groceriesErrMess={this.props.groceriesErrMess}
                  groceryInstances={this.props.groceryInstances}
                  handleChooseGrocery={handleChooseGrocery}
                />
              )}
              <div className="col-md-12 col-lg-7 col-xl-8 offset-xl-3 offset-lg-4 pt-lg-5 pl-lg-5">
                <div className="tab-content">
                  {this.props.groceryInstancesLoading ? (
                    <div>Loading items...</div>
                  ) : (
                    <>
                      {!this.props.groceryInstances.length ? (
                        <div>Add your first grocery from the searchbar</div>
                      ) : null}
                      {this.props.groceryCategories.map((category) => {
                        return (
                          <DetectSection>
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
