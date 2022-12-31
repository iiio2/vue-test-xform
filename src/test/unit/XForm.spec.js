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
});
