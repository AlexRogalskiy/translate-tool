import {fireEvent, render} from '@testing-library/svelte'
import {expect} from 'chai'
import TextInput from './TextInput.svelte'
import type {Dict} from '../common/Project'

describe('TextInput', () => {

  const dict: Dict = {something: 'no html', somethingHtml: 'html', b: {c: 'c'}}
  let key = 'somethingHtml'
  let fullKey = 'someKey.' + key
  let lang = 'en'

  it('renders element with contenteditable if given key that ends with Html and editing works', async () => {
    const {container} = render(TextInput, {uneditedDict:dict, dict, key, lang, fullKey})
    const element = container.querySelector('[contenteditable]')
    expect(element).to.exist
    expect(element!.textContent).to.contain('html')
    expect(container.querySelector('.btn')).to.exist
    element!.textContent = 'edited'
    expect(element!.textContent).to.contain('edited')
  })

  it('Clicking on html button renders the HTML preview', async () => {
    const {container} = render(TextInput, {uneditedDict:dict, dict, key, lang, fullKey})
    const button: HTMLButtonElement|null = container.querySelector('.btn')
    expect(button).to.exist
    expect(container.querySelector('.preview')).to.not.exist
    await fireEvent.click(button!)
    expect(container.querySelector('.preview')).to.exist
  })

  it('renders element with contenteditable if any of the keys ends with Html', async () => {
    key = 'something'
    fullKey = 'someKeyHtml.' + key
    const {container} = render(TextInput, {uneditedDict:dict, dict, key, lang, fullKey})
    const element = container.querySelector('[contenteditable]')
    expect(element).to.exist
    expect(element!.textContent).to.contain('html')
    expect(container.querySelector('.btn')).to.exist
  })

  it('renders textarea if key does not end with Html', async () => {
    key = 'something'
    fullKey = 'someKey.' + key
    const {container} = render(TextInput, {uneditedDict:dict, dict, key, lang, fullKey})
    const element = container.querySelector('textarea')
    expect(element).to.exist
    expect(element!.value).to.contain('html')
    element!.value = 'edited'
    expect(element!.value).to.contain('edited')
    expect(container.querySelector('.btn')).to.not.exist
  })
})
