import { describe, it, expect, vi } from "vitest";
import { mount } from "@vue/test-utils";
import Button from "@/components/ui/Button.vue";

describe("Button", () => {
  it("renders slot content", () => {
    const wrapper = mount(Button, {
      slots: {
        default: "Click me",
      },
    });

    expect(wrapper.text()).toContain("Click me");
  });

  it("renders with default props", () => {
    const wrapper = mount(Button, {
      slots: {
        default: "Button",
      },
    });

    expect(wrapper.attributes("type")).toBe("button");
    expect(wrapper.attributes("disabled")).toBeUndefined();
  });

  it("applies correct variant classes", async () => {
    const variants = [
      "primary",
      "secondary",
      "outline",
      "ghost",
      "destructive",
    ] as const;

    for (const variant of variants) {
      const wrapper = mount(Button, {
        props: { variant },
        slots: { default: "Button" },
      });

      // Button should have some variant-specific class
      expect(wrapper.classes().length).toBeGreaterThan(0);
    }
  });

  it("applies correct size classes", () => {
    const sizes = ["sm", "md", "lg"] as const;

    for (const size of sizes) {
      const wrapper = mount(Button, {
        props: { size },
        slots: { default: "Button" },
      });

      expect(wrapper.classes().length).toBeGreaterThan(0);
    }
  });

  it("is disabled when disabled prop is true", () => {
    const wrapper = mount(Button, {
      props: { disabled: true },
      slots: { default: "Button" },
    });

    expect(wrapper.attributes("disabled")).toBeDefined();
  });

  it("shows loading spinner when loading prop is true", () => {
    const wrapper = mount(Button, {
      props: { loading: true },
      slots: { default: "Button" },
    });

    expect(wrapper.find("svg").exists()).toBe(true);
    expect(wrapper.attributes("disabled")).toBeDefined();
  });

  it("emits click event when clicked", async () => {
    const wrapper = mount(Button, {
      slots: { default: "Button" },
    });

    await wrapper.trigger("click");

    expect(wrapper.emitted("click")).toBeTruthy();
    expect(wrapper.emitted("click")).toHaveLength(1);
  });

  it("does not emit click event when disabled", async () => {
    const wrapper = mount(Button, {
      props: { disabled: true },
      slots: { default: "Button" },
    });

    await wrapper.trigger("click");

    expect(wrapper.emitted("click")).toBeFalsy();
  });

  it("does not emit click event when loading", async () => {
    const wrapper = mount(Button, {
      props: { loading: true },
      slots: { default: "Button" },
    });

    await wrapper.trigger("click");

    expect(wrapper.emitted("click")).toBeFalsy();
  });

  it("accepts custom type prop", () => {
    const wrapper = mount(Button, {
      props: { type: "submit" },
      slots: { default: "Submit" },
    });

    expect(wrapper.attributes("type")).toBe("submit");
  });

  it("accepts custom class prop", () => {
    const wrapper = mount(Button, {
      props: { class: "custom-class" },
      slots: { default: "Button" },
    });

    expect(wrapper.classes()).toContain("custom-class");
  });

  it("passes click event with MouseEvent", async () => {
    const handleClick = vi.fn();
    const wrapper = mount(Button, {
      slots: { default: "Button" },
      attrs: {
        onClick: handleClick,
      },
    });

    await wrapper.trigger("click");

    const emitted = wrapper.emitted("click");
    expect(emitted).toBeTruthy();
    expect(emitted?.[0]?.[0]).toBeInstanceOf(MouseEvent);
  });
});
