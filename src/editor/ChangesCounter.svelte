<script lang="ts">
  import {totalDifferentValues} from './languageStats'
  import type {Dict} from '../common/Project'
  import Icon from '../components/Icon.svelte'

  export let dict: Dict
  export let uneditedDict: Dict

  let changes = 0

  $: if (dict) changes = totalDifferentValues(dict, uneditedDict)
</script>

<div class="num-changes card h-100 flex-row justify-content-center bg-light align-items-center p-1 px-2 text-secondary rounded-pill order-md-3 me-lg-4
{!changes ? `d-md-none` : ``}">

  <Icon name="info" class="me-1 text-warning"/>
  <span>{changes} {changes === 1 ? `change` : `changes`}</span>
</div>

<style>
  .text-secondary {
    font-size: 0.95em;
    transition: opacity 0.6s;
  }
</style>
