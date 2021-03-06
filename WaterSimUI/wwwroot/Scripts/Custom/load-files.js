﻿function loadCSSFiles() {
    var cssFiles = {
        scripts: ["Scripts/Chosen/chosen.css"],
        themes: ["Content/themes/smoothness/jquery-ui.css", "Content/themes/base/Gear.tooltip.css"],
        content: ["Content/accordion.css", "Content/collapsible_panels.css", "Content/pageslide.css", "Content/climateTab.css",
            /*This reference causing NetworkError: 404 Not found
            "Content/validationTab.css",*/
            "Content/wizard.css", "Content/basic.css", "Content/basic_ie.css", "Content/horizontal.css", "Content/isotope.css"],
        sideshow: ["Scripts/Sideshow/distr/fonts/sideshow-fontface.min.css", "Scripts/Sideshow/distr/stylesheets/sideshow.css"],
        sandkey: ["Scripts/Custom/Sankey/sankey.css"],
        timer: ["Content/timer.css"]
    };

    // STEPTOE EDIT 4/27/16 BEGIN
    if (window.location.href.toLowerCase().indexOf('ipad') > -1) {
        cssFiles['ipad'] = ['Content/ipad.css'];
    }
    // STEPTOE EDIT 4/27/16 END

    for (var files in cssFiles) {
        for (var i = 0; i < cssFiles[files].length; i++) {
            var link = document.createElement("link")
            link.setAttribute("rel", "stylesheet")
            link.setAttribute("type", "text/css")
            link.setAttribute("href", cssFiles[files][i])
            document.getElementsByTagName('head')[0].appendChild(link);
        }
    }
}

loadCSSFiles();


var Utilities = {};

//---------------------------------------------------------------------------------------
//Source - http://stackoverflow.com/questions/2879509/dynamically-loading-javascript-synchronously
//Asynchronously load each file in order
Utilities.require = function (file, callback) {
    callback = callback ||
    function () { };
    var filenode;
    var jsfile_extension = /(.js)$/i;
    var cssfile_extension = /(.css)$/i;

    if (jsfile_extension.test(file)) {
        filenode = document.createElement('script');
        filenode.src = file;
        // IE
        filenode.onreadystatechange = function () {
            if (filenode.readyState === 'loaded' || filenode.readyState === 'complete') {
                filenode.onreadystatechange = null;
                callback();
            }
        };
        // others
        filenode.onload = function () {
            callback();
        };
        document.head.appendChild(filenode);
    } else if (cssfile_extension.test(file)) {
        filenode = document.createElement('link');
        filenode.rel = 'stylesheet';
        filenode.type = 'text/css';
        filenode.href = file;
        document.head.appendChild(filenode);
        callback();
    } else {
        console.log("Unknown file type to load.")
    }
};

Utilities.requireFiles = function () {
    var index = 0;
    return function (files, callback) {
        index += 1;
        Utilities.require(files[index - 1], callBackCounter);

        function callBackCounter() {
            if (index === files.length) {
                index = 0;
                callback();
            } else {
                Utilities.requireFiles(files, callback);
            }
        };
    };
}();

function loadJSFiles() {
    var jsFiles = {
        jquery: ["Scripts/jquery-2.1.0.js", "Scripts/jquery-ui-1.10.4.js", ],
        d3: ["Scripts/d3.min.js"],
        accordion: ["Scripts/msAccordion.js", "Scripts/Custom/jquery.zaccordion.js", "Scripts/Custom/collapsible-panels.js"],
        init: ["Scripts/Custom/document-ready.js", "Scripts/Custom/jquery-functions.js"],
        chosen: ["Scripts/Chosen/chosen.jquery.js", "Scripts/Chosen/docsupport/prism.js"],
        modal: ["Scripts/SimpleModal/jquery.simplemodal.js", "Scripts/SimpleModal/basic.js"],
        isotope: ["Scripts/Isotope/isotope.pkgd.js", "Scripts/Isotope/isotope.js"],
        slider: ["Scripts/Custom/Slider/SettingRun.js", "Scripts/Custom/Slider/SettingSlider.js"],
        indicators: ["Assets/indicators/Scripts/IndicatorControl_v_4.js", "Assets/indicators/Scripts/indicatorsCore_v2.js"],
        sly: ["Scripts/Sly/sly.js", "Scripts/Sly/horizontal-supply.js", "Scripts/Sly/horizontal-demand.js", "Scripts/Sly/horizontal-reservoirs.js",
            "Scripts/Sly/horizontal-climate.js"],
        charts: ["Scripts/Highcharts/highcharts.js", "Scripts/Custom/Charts/ChartTools.js", "Scripts/Custom/Charts/DrillDownChartBO.js", "Scripts/Custom/Charts/ProvidersChart.js",
            "Scripts/Custom/Charts/AreaChart.js", "Scripts/Custom/Charts/DrillDownColumnChartBO.js", "Scripts/Custom/Charts/DrillDownLineChartBO.js",
            "Scripts/Custom/Charts/DrillDownLineChartTEMP.js", "Scripts/Custom/Charts/DrillDownPieColumnChartMF.js", "Scripts/Custom/Charts/DrillDownPieColumnChartMP.js",
            "Scripts/Custom/Charts/DrillDownSingleColumnChart.js", "Scripts/Custom/Charts/StackedAreaChart.js", "Scripts/Custom/Charts/StackedColumnChart.js",
            "Scripts/Custom/Charts/LineChartMP.js", "Scripts/HighCharts/modules/drilldown.js",
            "Scripts/Custom/Charts/HighChartsUnderscoreFix.js", "Scripts/Highcharts/modules/exporting.js", "Scripts/Custom/Charts/SankeyChart.js"],
        sandkey: ["Scripts/Custom/Sankey/sankey.js"],
        other: ["Scripts/rgbcolor.js", "Scripts/canvg.js", "Scripts/Custom/qPbar.js"],
        sideshow: ["Scripts/Sideshow/distr/dependencies/jazz.min.js", "Scripts/Sideshow/distr/dependencies/pagedown.min.js", "Scripts/Sideshow/distr/sideshow.js",
            "Scripts/Custom/Core/GuidedInteraction.js"],
        utilities: ["Scripts/Custom/Core/ConvertInputControls.js", "Scripts/Custom/Core/UrlHandler.js"],
        core: ["Scripts/Custom/Core/RiverFlow.js", "Scripts/Custom/Add/CoreAdd.js", "Scripts/Custom/Core/AddInput.js",
            "Scripts/Custom/Core/CoreGenFunctions.js", "Scripts/Custom/Core/CoreDrawCharts.js", "Scripts/Custom/Core/CoreGetJSON.js",
            "Scripts/Custom/Core/Core.js"]
    //"Scripts/Custom/Sankey/flux.js"
    };

    //Do not include indicators if the page type is for the Ipad
    // 03.16.16 DAS added "Scripts/Custom/Ipad/Core/CoreQuayChart.js", and ...the following four charts

    // QUAY EDIT 3/19/16 begin
    // window.location.href returns a lower case "ipad" when on server and an upper case "Ipad" when local
    //if (window.location.href.indexOf('Ipad') > -1) {
    if (window.location.href.toLowerCase().indexOf('ipad') > -1) {
    // QUAY EDIT 3/19/16 end

        delete jsFiles['indicators'];
        // QUAY EDIT 3/19/16 BEGIN
        // Note this overrides the base files for slider
        jsFiles['slider'] = ["Scripts/Custom/Ipad/Core/SettingRunButton.js", "Scripts/Custom/Slider/SettingSlider.js"],
        // QUAY EDIT 3/19/16 END
        jsFiles['charts'].push("Scripts/Custom/Charts/MultiPieChart.js");
        jsFiles['charts'].push("Scripts/Custom/Charts/PieChart.js");
        jsFiles['charts'].push("Scripts/Custom/Charts/SimpleStackedColumn.js");
        jsFiles['charts'].push("Scripts/Custom/Charts/ComplexStackedColumn.js");
        // QUAY EDIT 3/19/16 BEGIN
        // Note this overrides the base files for sideshow
        jsFiles['sideshow'] = ["Scripts/Sideshow/distr/dependencies/jazz.min.js", "Scripts/Sideshow/distr/dependencies/pagedown.min.js",
            "Scripts/Sideshow/distr/sideshow.js", "Scripts/Custom/Ipad/Core/GuidedInteractionWSAmerica.js"]
        // QUAY EDIT 3/19/16 END

        // QUAY EDIT 3/19/16 BEGIN
        // added "Scripts/Custom/Ipad/AmericaAppControl.js"
        jsFiles['core'] = ["Scripts/Custom/Ipad/Core/AmericaAppControl_v2.js", , "Scripts/Custom/Ipad/Core/Assessment/Xpan_V2.js", "Scripts/Custom/Ipad/Core/Assessment/WSA_AssessmentReport_v4.js",

            "Scripts/Custom/Ipad/STC.js", "Scripts/Custom/Core/RiverFlow.js", "Scripts/Custom/Ipad/Indicators/indicator.js",
        "Scripts/Custom/Ipad/Core/CoreGenFunctions.js", "Scripts/Custom/Ipad/Core/CoreGetJSON.js",
        "Scripts/Custom/Ipad/Core/CoreDrawCharts.js", "Scripts/Custom/Ipad/Core/CoreQuayChart.js",
        "Scripts/Custom/Ipad/Core/soundsupport.js",   "Scripts/Custom/Ipad/Core/Core.js"];
        // QUAY EDIT 3/19/16 END

        // STEPTOE EDIT 4/27/16 BEGIN
        jsFiles['timer'] = ["Scripts/Custom/Ipad/Timer/ExternalFunctions.js", "Scripts/Custom/Ipad/Timer/CountDown.js"]
        // STEPTOE EDIT 4/27/16 END
    }

    var fileArray = [];
    for (var fileType in jsFiles) {
        for(var file in jsFiles[fileType]){
            fileArray.push(jsFiles[fileType][file]);
        }
    }

    Utilities.requireFiles(fileArray, function(){
        //Call the init function in the loaded file.
    })
}

loadJSFiles();
