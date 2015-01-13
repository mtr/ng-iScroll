/**
 * @license ng-iScroll v1.3.0, 2015-01-13 22:26:07
 * (c) 2013 Brad Vernon <ibspoof@gmail.com>
 * License: MIT
 */
angular.module('ng-iscroll', []).directive('ngIscroll', ['$timeout', function ($timeout) {
    return {
        replace: false,
        restrict: 'A',
        link: function (scope, element, attr) {
            // default timeout
            var ngiScroll_timeout = 5;


            // default options
            var ngiScroll_opts = {
                snap: true,
                momentum: true,
                hScrollbar: false,
                mouseWheel: true,
                on: []
            };

            // scroll key /id
            var scroll_key = attr.ngIscroll;

            if (scroll_key === '') {
                scroll_key = attr.id;
            }

            if (scope.$parent.myScrollOptions) {
                for (var i in scope.$parent.myScrollOptions) {
                    if (i === scroll_key) {
                        for (var k in scope.$parent.myScrollOptions[i]) {
                            ngiScroll_opts[k] = scope.$parent.myScrollOptions[i][k];
                        }
                    } else {
                        ngiScroll_opts[i] = scope.$root.myScrollOptions[i];
                    }
                }
            }

            // iScroll initialize function
            function setScroll() {
                if (scope.$parent.myScroll === undefined) {
                    scope.$parent.myScroll = [];
                }

                scope.$parent.myScroll[scroll_key] = new IScroll(element[0], ngiScroll_opts);

                for (var i = ngiScroll_opts.on.length - 1; i >= 0; i--) {
                    for (var key in ngiScroll_opts.on[i]) {
                        scope.$parent.myScroll[scroll_key].on(key.toString(), ngiScroll_opts.on[i][key]);
                    }
                }

                scope.$parent.myScroll[scroll_key]._execEvent("init");
            }

            // new specific setting for setting timeout using: ng-iscroll-timeout='{val}'
            if (attr.ngIscrollDelay !== undefined) {
                ngiScroll_timeout = attr.ngIscrollDelay;
            }

            // watch for 'ng-iscroll' directive in html code
            scope.$watch(attr.ngIscroll, function () {
                $timeout(setScroll, ngiScroll_timeout);
            });

        }
    };
}]);
