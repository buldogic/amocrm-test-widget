define(["jquery"], function ($) {
  "use strict";

  return function () {
    var self = this;

    this.callbacks = {
      render: function () {
        return true;
      },

      init: function () {
        return true;
      },

      bind_actions: function () {
        return true;
      },

      settings: function () {
        var $modal_body = $(
            ".modal." + self.get_settings().widget_code + " .modal-body"
          ),
          $widget_settings = $modal_body.find(".widget_settings_block");

        var inputLeftId = "widget-input-left";
        var inputHtmlStrA = self.render(
          { ref: "/tmpl/controls/input.twig" },
          {
            placeholder: "A",
            class_name: "widget_input",
            type: "number",
            id: inputLeftId,
          }
        );

        var inputRightId = "widget-input-right";
        var inputHtmlStrB = self.render(
          { ref: "/tmpl/controls/input.twig" },
          {
            placeholder: "B",
            class_name: "widget_input",
            type: "number",
            id: inputRightId,
          }
        );

        var inputSumId = "widget-input-sum";
        var inputHtmlStrC = self.render(
          { ref: "/tmpl/controls/input.twig" },
          {
            placeholder: "Сумма не посчитана",
            class_name: "widget_input",
            id: inputSumId,
            type: "number",
            readonly: true,
          }
        );

        $widget_settings.html(`
          <h5>Тестовое задание</h5>
          <br>
          <br>
          <div>
            <h6>Первое слагаемое</h6>
            ${inputHtmlStrA}
            <br>
            <br>
            <h6>Второе слагаемое</h6>
            ${inputHtmlStrB}
            <br>
            <br>
            <h6>Сумма</h6>
            ${inputHtmlStrC}
          </div>
        `);

        var $inputLeft = $widget_settings.find(`#${inputLeftId}`);
        var $inputRight = $widget_settings.find(`#${inputRightId}`);
        var $inputSum = $widget_settings.find(`#${inputSumId}`);

        var leftValue = "";
        var rightValue = "";

        function renderSum() {
          if (!leftValue.length) return $inputSum.val("");
          if (!rightValue.length) return $inputSum.val("");

          var leftValueNumber = Number(leftValue);
          if (Number.isNaN(leftValueNumber)) return $inputSum.val("");

          var rightValueNumber = Number(rightValue);
          if (Number.isNaN(rightValueNumber)) return $inputSum.val("");

          $inputSum.val(leftValueNumber + rightValueNumber);
        }

        $inputLeft.on("input", function () {
          leftValue = $(this).val();
          renderSum();
        });

        $inputRight.on("input", function () {
          rightValue = $(this).val();
          renderSum();
        });

        return true;
      },

      onSave: function () {
        return true;
      },
    };
  };
});
