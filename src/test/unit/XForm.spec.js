import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import XForm from "../../components/XForm.vue";

describe("XForm", () => {
  it("should be truthy", () => {
    expect(XForm).toBeTruthy();
  });
  it("should accept object in v-model and array in props", () => {
    const wrapper = mount(XForm, {
      props: {
        modelValue: {
          name: "Alex",
          dateOfBirth: "2023-01-06",
          eyeColor: "blue",
        },
        fields: [
          {
            field: "name",
            component: "input",
            type: "text",
            placeholder: "Name",
          },
        ],
      },
    });
    expect(wrapper.props().modelValue).toStrictEqual({
      name: "Alex",
      dateOfBirth: "2023-01-06",
      eyeColor: "blue",
    });
    expect(wrapper.props().fields).toStrictEqual([
      {
        field: "name",
        component: "input",
        type: "text",
        placeholder: "Name",
      },
    ]);
  });
  it("should render each string as separate input", async () => {
    const wrapper = mount(XForm, {
      props: {
        modelValue: {
          name: "Alex",
          dateOfBirth: "2023-01-06",
          eyeColor: "blue",
        },
        fields: [
          {
            field: "name",
            component: "input",
            type: "text",
            placeholder: "Name",
          },
        ],
      },
    });
    await wrapper.vm.$nextTick();
    expect(wrapper.findAll("input").length).toBe(1);
  });

  it("writes back to the array when input value is changed", async () => {
    const wrapper = mount(XForm, {
      props: {
        modelValue: {
          name: "Alex",
          dateOfBirth: "2023-01-06",
          eyeColor: "blue",
        },
        fields: [
          {
            field: "name",
            component: "input",
            type: "text",
            placeholder: "Name",
          },
        ],
      },
    });
    await wrapper.vm.$nextTick();
    const input = wrapper.findAll("input").at(0);
    await input.setValue("new input");
    expect(wrapper.emitted("update:modelValue")[0][0]).toStrictEqual({
      name: "new input",
      dateOfBirth: "2023-01-06",
      eyeColor: "blue",
    });
  });
  ///// #####
  it("example works as expected (compare the snapshot)", async () => {
    const wrapper = mount(XForm, {
      props: {
        modelValue: {
          name: "Alex",
          dateOfBirth: "2023-01-06",
          eyeColor: "blue",
        },
        fields: [
          {
            field: "name",
            component: "input",
            type: "text",
            placeholder: "Name",
          },
        ],
      },
    });
    await wrapper.vm.$nextTick();

    expect(wrapper.html()).toMatchSnapshot();
  });
  // #####
  it("renders form same amount of child elements as length of fields", async () => {
    const wrapper = mount(XForm, {
      props: {
        modelValue: {
          name: "Alex",
          dateOfBirth: "2023-01-06",
          eyeColor: "blue",
        },
        fields: [
          {
            field: "name",
            component: "input",
            type: "text",
            placeholder: "Name",
          },
        ],
      },
    });
    await wrapper.vm.$nextTick();
    const form = wrapper.findAll("form").length;
    const field = wrapper.props().fields.length;
    expect(form.length).toBe(field.length);
  });
  //// ######
  it("field.component gets the name of the component (or tag) that should be rendered (for example it can be input, or select, or div, etc.).", async () => {
    const wrapper = mount(XForm, {
      props: {
        modelValue: {
          name: "Alex",
          dateOfBirth: "2023-01-06",
          eyeColor: "blue",
        },
        fields: [
          {
            field: "name",
            component: "input",
            type: "text",
            placeholder: "Name",
          },
        ],
      },
    });
    await wrapper.vm.$nextTick();
    const getItem = wrapper.props().fields[0].component;
    expect(getItem).toBe("input");
  });
  /// #####
  it("field.field get the name of the key of the v-model object to edit", async () => {
    const wrapper = mount(XForm, {
      props: {
        modelValue: {
          name: "Alex",
          dateOfBirth: "2023-01-06",
          eyeColor: "blue",
        },
        fields: [
          {
            field: "name",
            component: "input",
            type: "text",
            placeholder: "Name",
          },
        ],
      },
    });
    await wrapper.vm.$nextTick();
    const field = wrapper.props().fields[0].field;
    expect(field).toBe("name");
  });
  ///// ###
  it("when value of input is changed, it updates v-model", async () => {
    const wrapper = mount(XForm, {
      props: {
        modelValue: {
          name: "Alex",
          dateOfBirth: "2023-01-06",
          eyeColor: "blue",
        },
        fields: [
          {
            field: "name",
            component: "input",
            type: "text",
            placeholder: "Name",
          },
        ],
      },
    });
    await wrapper.vm.$nextTick();
    const input = wrapper.findAll("input");
    await input[0].setValue("new value");
    let getValue = input[0].element.value;
    expect(getValue).toBe("new value");
  });
});
