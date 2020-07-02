<template>
<div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <router-link class="navbar-brand" to="/">Navbar</router-link>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
            <li class="nav-item active">
            <a class="nav-link" href="#">
                Home
                <span class="sr-only">(current)</span>
            </a>
            </li>
        </ul>
        <router-link class="btn btn-pink" to="/login">
            <i class="fas fa-user"></i>
        </router-link>
        <div class="dropdown">
            <button
            class="btn btn-secondary dropdown-toggle"
            type="button"
            id="dropdownMenuButton"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
            >Dropdown button</button>
            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <a class="dropdown-item" href="#">Action</a>
            <a class="dropdown-item" href="#">Another action</a>
            <a class="dropdown-item" href="#">Something else here</a>
            </div>
        </div>
        </div>
    </nav>
    </div>
</template>

<script>
export default {};
</script>