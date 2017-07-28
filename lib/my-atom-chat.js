'use babel';

import MyAtomChatView from './my-atom-chat-view';
import { CompositeDisposable } from 'atom';

export default {

  myAtomChatView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.myAtomChatView = new MyAtomChatView(state.myAtomChatViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.myAtomChatView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'my-atom-chat:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.myAtomChatView.destroy();
  },

  serialize() {
    return {
      myAtomChatViewState: this.myAtomChatView.serialize()
    };
  },

  toggle() {
    console.log('MyAtomChat was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
