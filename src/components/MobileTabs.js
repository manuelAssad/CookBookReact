import React, { Component } from "react";

class MobileTabs extends Component {
  render() {
    return (
      <div class="mobile-tabs d-flex d-lg-none">
        {this.props.groupName === "recipeCategories" ? (
          <div
            id={`mobile-tab-${this.props.groupName}-all`}
            class={`mr-1 ${
              this.props.activeTab === null
                ? "mobile-tab-item-active"
                : "mobile-tab-item"
            }`}
            onClick={() => this.props.onTabClick(null)}
          >
            All Recipes
          </div>
        ) : null}
        {this.props.data.map((item) => {
          return (
            <div
              id={`mobile-tab-${this.props.groupName}-${item.id}`}
              class={`mr-1 ${
                this.props.activeTab == item.id
                  ? "mobile-tab-item-active"
                  : "mobile-tab-item"
              }`}
              onClick={() => this.props.onTabClick(item.id)}
            >
              {item.name}
            </div>
          );
        })}
      </div>
    );
  }
}

export default MobileTabs;
