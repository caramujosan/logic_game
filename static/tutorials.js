document.addEventListener('DOMContentLoaded', function()
            {
                var x = "x";

                var y = "y";

                var m = "m";

                // tooltip the diagrams
                $('.n9').tooltip({title: "(9)  " + x + ",  not " + m + ", " + y, placement: "left"});
                $('.n10').tooltip({title: "(10)  " + x + ",  not " + m + ",  not " + y, placement: "right"});
                $('.n11').tooltip({title: "(11)  " + x + ", " + m + ", " + y, placement: "left"});
                $('.n12').tooltip({title: "(12)  "  + x + ", " + m + ",  not " + y, placement: "right"});
                $('.n13').tooltip({title: "(13)  " + ", not " + x + ", " + m + ", " + y, placement: "left"});
                $('.n14').tooltip({title: "(14)  " + ", not " + x + ", " + m + ",  not " + y, placement: "right"});
                $('.n15').tooltip({title: "(15)  " + ", not " + x + ",  not " + m + ", " + y, placement: "left"});
                $('.n16').tooltip({title: "(16)  " + ", not " + x + ",  not " + m + ",  not " + y, placement: "right"});

                $('.n5').tooltip({title: "(5)  " + x + ", " + y, placement: "left"});
                $('.n6').tooltip({title: "(6)  " + x + ",  not " + y, placement: "right"});
                $('.n7').tooltip({title: "(7)  " + " not " + x + ", " + y, placement: "left"});
                $('.n8').tooltip({title: "(8)  " + " not " + x + ",  not " + y, placement: "right"});

            });