document.addEventListener('DOMContentLoaded', function()
{
        $("#password2").keyup(function()
        {
            // strngth password code based in Martech Zone's Douglas Karr
            var strength2 = document.getElementById('strength2');

            var strongRegex = new RegExp("^(?=.{8,})(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*\\W).*$", "g");

            var mediumRegex = new RegExp("^(?=.{8,})(((?=.*[A-Z])(?=.*[a-z]))|((?=.*[A-Z])(?=.*[0-9]))|((?=.*[a-z])(?=.*[0-9]))).*$", "g");

            var enoughRegex = new RegExp("(?=.{8,}).*", "g");

            var pwd2 = document.getElementById("password2");

            if (pwd2.value.length == 0)
            {
                strength2.innerHTML = 'Type Password';
            }
            else if (false == enoughRegex.test(pwd2.value))
            {
                strength2.innerHTML = 'More Characters';
            }
            else if (strongRegex.test(pwd2.value))
            {
                strength2.innerHTML = '<span style="color:green">Strong!</span>';
            }
            else if (mediumRegex.test(pwd2.value))
            {
                strength2.innerHTML = '<span style="color:orange">Medium!</span>';
            }
            else
            {
                strength2.innerHTML = '<span style="color:red">Weak!</span>';
            }
        });
});