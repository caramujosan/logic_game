document.addEventListener('DOMContentLoaded', function()
            {
                var sound = new Howl({
                    src: ['static/button_sound.mp3', 'static/button_sound.ogg'],
                    duration: 0.340,
                    key: [0, 0.340],
                    volume: 0.3
                });


                var paths = document.querySelectorAll('.diagram');

                var color_empty = 'blue';
                var color_some = 'green';
                var color_division_line = 'yellow';
                var color_not_marked = 'grey';

                // loop through diagram svg paths
                for (let i = 0; i < paths.length; i++)
                {
                    // when path is clicked, change the color
                    paths[i].addEventListener('click', function()
                    {
                        sound.play();

                        if (document.getElementsByClassName('diagram')[i].style.fill !== color_empty
                        && document.getElementsByClassName('diagram')[i].style.fill !== color_some &&
                        document.getElementsByClassName('diagram')[i].style.fill !== color_division_line)
                        {
                            paths[i].style.fill = color_empty;
                        }
                        else if (document.getElementsByClassName('diagram')[i].style.fill === color_empty)
                        {
                            paths[i].style.fill = color_some;
                        }
                        else if (document.getElementsByClassName('diagram')[i].style.fill === color_some)
                        {
                            paths[i].style.fill = color_division_line;
                        }
                        else
                        {
                            paths[i].style.fill = '#DDD';
                        }
                    });
                }



                // when a different problem is chosen in the dropdown list...
                $("#problem_list").change(function()
                {
                    $('#answer').hide();

                    $('#answer2').hide();
                    
                    // get value of chosen problem
                    chosen_problem = $("#problem_list").val();


                    // send value to server and...
                    $.post("/get_server_data", {javascript_data: chosen_problem}, function(data)
                    {
                        // get server data back
                        var data_from_the_server = $.parseJSON(data);


                        // get premises and conclusion...if any
                        var first_premise = data_from_the_server[15];

                        var second_premise = data_from_the_server[16];

                        var conclusion = data_from_the_server[17];

                        var conclusion_2 = data_from_the_server[18];


                        // get logic atributes to display tooltip
                        var x = data_from_the_server[19];

                        var y = data_from_the_server[20];

                        var m = data_from_the_server[21];


                        // get path values from data_from_the_server list
                        var big_diagram_values = data_from_the_server.slice(1, 9);

                        var small_diagram_values = data_from_the_server.slice(10, 14);

                        var full_diagram = big_diagram_values.concat(small_diagram_values);



                        // show premises of chosen problem on screen
                        $('#premise').hide().html(first_premise).fadeIn(2000);

                        if (second_premise != "")
                        {
                            $('#premise2').hide().html(second_premise).fadeIn(4000);
                        }
                        else
                        {
                            $('#premise2').hide();
                        }

                        // tooltips
                        $('.diagram').hover(function ()
                        {
                            if (m != "")
                            {
                                // tooltip the diagrams
                                $('#upper_left').tooltip('dispose').tooltip({title: "(9)  " + x + ",  not " + m + ", " + y, placement: "left"}).show();
                                $('#upper_right').tooltip('dispose').tooltip({title: "(10)  " + x + ",  not " + m + ",  not " + y, placement: "right"}).show();
                                $('#upper_mid_left').tooltip('dispose').tooltip({title: "(11)  " + x + ", " + m + ", " + y, placement: "left"}).show();
                                $('#upper_mid_right').tooltip('dispose').tooltip({title: "(12)  "  + x + ", " + m + ",  not " + y, placement: "right"}).show();
                                $('#lower_mid_left').tooltip('dispose').tooltip({title: "(13)  " + " not " + x + ", " + m + ", " + y, placement: "left"}).show();
                                $('#lower_mid_right').tooltip('dispose').tooltip({title: "(14)  " + " not " + x + ", " + m + ",  not " + y, placement: "right"}).show();
                                $('#lower_left').tooltip('dispose').tooltip({title: "(15)  " + " not " + x + ",  not " + m + ", " + y, placement: "left"}).show();
                                $('#lower_right').tooltip('dispose').tooltip({title: "(16)  " + " not " + x + ",  not " + m + ",  not " + y, placement: "right"}).show();

                                $('#upper_left_small').tooltip('dispose').tooltip({title: "(5)  " + x + ", " + y, placement: "left"}).show();
                                $('#upper_right_small').tooltip('dispose').tooltip({title: "(6)  " + x + ",  not " + y, placement: "right"}).show();
                                $('#lower_left_small').tooltip('dispose').tooltip({title: "(7)  " + " not " + x + ", " + y, placement: "left"}).show();
                                $('#lower_right_small').tooltip('dispose').tooltip({title: "(8)  " + " not " + x + ",  not " + y, placement: "right"}).show();
                            }
                            else
                            {
                                // tooltip the diagrams
                                $('#upper_left').tooltip('dispose').tooltip({title: "(9)  " + x + ", " + y, placement: "left"}).show();
                                $('#upper_right').tooltip('dispose').tooltip({title: "(10)  " + x + ",  not " + y, placement: "right"}).show();
                                $('#upper_mid_left').tooltip('dispose').tooltip({title: "(11)  " + x + ", " + y, placement: "left"}).show();
                                $('#upper_mid_right').tooltip('dispose').tooltip({title: "(12)  "  + x + ",  not " + y, placement: "right"}).show();
                                $('#lower_mid_left').tooltip('dispose').tooltip({title: "(13)  " + " not " + x + ", " + y, placement: "left"}).show();
                                $('#lower_mid_right').tooltip('dispose').tooltip({title: "(14)  " + " not " + x + ",  not " + y, placement: "right"}).show();
                                $('#lower_left').tooltip('dispose').tooltip({title: "(15)  " + " not " + x + ", " + y, placement: "left"}).show();
                                $('#lower_right').tooltip('dispose').tooltip({title: "(16)  " + " not " + x + ",  not " + y, placement: "right"}).show();

                                $('#upper_left_small').tooltip('dispose').tooltip({title: "(5)  " + x + ", " + y, placement: "left"}).show();
                                $('#upper_right_small').tooltip('dispose').tooltip({title: "(6)  " + x + ",  not " + y, placement: "right"}).show();
                                $('#lower_left_small').tooltip('dispose').tooltip({title: "(7)  " + " not " + x + ", " + y, placement: "left"}).show();
                                $('#lower_right_small').tooltip('dispose').tooltip({title: "(8)  " + " not " + x + ",  not " + y, placement: "right"}).show();
                            }
                        });

                            console.log(full_diagram)
                        // when answer button is clicked...
                        $("#problemo").click(function()
                        {
                            // fill list with the diagram situation on submition
                            var path_list = [];

                            for (let i = 0; i < paths.length; i++)
                            {
                                if (document.getElementsByClassName('diagram')[i].style.fill === color_empty)
                                {
                                    path_list.push(color_empty);
                                }
                                else if (document.getElementsByClassName('diagram')[i].style.fill === color_some)
                                {
                                    path_list.push(color_some);
                                }
                                else if (document.getElementsByClassName('diagram')[i].style.fill === color_division_line)
                                {
                                    path_list.push(color_division_line);
                                }
                                else
                                {
                                    path_list.push(color_not_marked);
                                }
                            }


                            // compare equality between submitted diagram path answers and database diagram paths
                            if(JSON.stringify(path_list)!==JSON.stringify(full_diagram))
                            {
                                $('#answer').hide().html("conclusion is incorrect").fadeIn(1000);
                            }
                            else
                            {
                                if (conclusion !== "" && conclusion_2 === "")
                                {
                                    $('#answer').hide().html("therefore..." + conclusion).fadeIn(2000);
                                }
                                else if (conclusion !== "" && conclusion_2 !== "")
                                {
                                    $('#answer').hide().html("therefore..." + conclusion).fadeIn(2000);

                                    $('#answer2').hide().html(conclusion_2).fadeIn(3000);
                                }
                                else
                                {
                                    $('#answer').hide().html("Correct").fadeIn(2000);
                                }
                            }
                        });

                    });

                });

});
