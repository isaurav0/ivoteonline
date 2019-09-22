var button = document.getElementById('election');

var voters = document.getElementById('voters');



button.onclick = function(){
    var input = document.createElement('input');
    input.className = ['form-control voters'];
    input.type = "text";
    input.name = "voters";
    input.placeholder = '';
    // voters.appendChild(document.createElement('br'));
    voters.appendChild(input) 
}

// type="candidates" class="form-control candidates"  name="candidates" placeholder="Candidate"