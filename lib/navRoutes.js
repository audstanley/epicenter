import { FlowRouter } from "meteor/ostrio:flow-router-extra";

FlowRouter.route("/", {
  name: "mainTemplate",
  action() {
    // Render a template using Blaze
    this.render("mainTemplate");

    // Can be used with BlazeLayout,
    // and ReactLayout for React-based apps
  }
});

FlowRouter.route("/navbar", {
  name: "navbar",
  action() {
    // Render a template using Blaze
    this.render("navbar");

    // Can be used with BlazeLayout,
    // and ReactLayout for React-based apps
  }
});

FlowRouter.route("/frontDesign", {
  name: "frontDesign",
  action() {
    // Render a template using Blaze
    this.render("frontDesign");

    // Can be used with BlazeLayout,
    // and ReactLayout for React-based apps
  }
});

FlowRouter.route("/fileSearch", {
  name: "fileSearch",
  action() {
    // Render a template using Blaze
    this.render("fileSearch");

    // Can be used with BlazeLayout,
    // and ReactLayout for React-based apps
  }
});

FlowRouter.route("/fileUpload", {
  name: "fileUpload",
  action() {
    // Render a template using Blaze
    this.render("fileUpload");

    // Can be used with BlazeLayout,
    // and ReactLayout for React-based apps
  }
});

FlowRouter.route("/chat", {
  name: "chat",
  action() {
    // Render a template using Blaze
    this.render("chat");

    // Can be used with BlazeLayout,
    // and ReactLayout for React-based apps
  }
});

// Create 404 route (catch-all)
FlowRouter.route("*", {
  action() {
    // Show 404 error page using Blaze
    this.render("notFound");

    // Can be used with BlazeLayout,
    // and ReactLayout for React-based apps
  }
});
